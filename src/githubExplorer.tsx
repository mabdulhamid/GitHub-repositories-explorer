import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GitHubUser, GitHubRepo, searchUsers, getUserRepos } from './github';

export default function GitHubExplorer() {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading: loadingUsers,
    isError: isUsersError,
    error: usersError,
  } = useQuery<GitHubUser[]>({
    queryKey: ['users', searchQuery],
    queryFn: () => searchUsers(searchQuery),
    enabled: !!searchQuery,
  });

  const {
    isLoading: loadingRepos,
    isError: isReposError,
    error: reposError,
  } = useQuery<GitHubRepo[]>({
    queryKey: ['repos', expandedUser],
    queryFn: () => (expandedUser ? getUserRepos(expandedUser) : Promise.resolve([])),
    enabled: !!expandedUser,
    staleTime: 1000 * 60 * 5,
  });

  const reposMap = users.reduce<Record<string, GitHubRepo[]>>((acc, user) => {
    const cachedRepos = queryClient.getQueryData<GitHubRepo[]>(['repos', user.login]);
    if (cachedRepos) {
      acc[user.login] = cachedRepos;
    }
    return acc;
  }, {});

  return (
    <Box p={2} maxWidth={600} mx="auto" sx={{ width: '100%' }}>
      <TextField
        label="Username"
        placeholder="Enter username"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && query.trim()) {
            setSearchQuery(query.trim());
          }
        }}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        fullWidth
        onClick={() => setSearchQuery(query)}
        sx={{ mb: 2 }}
      >
        Search
      </Button>

      {isUsersError && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          Error loading users: {usersError instanceof Error ? usersError.message : 'Unknown error'}
        </Typography>
      )}
      {loadingUsers && searchQuery && (
        <Typography variant="body2" sx={{ mb: 2 }}>
          Loading users...
        </Typography>
      )}
      {searchQuery && !loadingUsers && users.length === 0 && !isUsersError && (
        <Typography variant="body2" sx={{ mb: 2 }}>
          No users found for “{searchQuery}”
        </Typography>
      )}
      {users.map((user) => (
        <Accordion
          key={user.id}
          expanded={expandedUser === user.login}
          onChange={(_, expanded) => setExpandedUser(expanded ? user.login : null)}
          sx={{ mb: 1 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#f5f5f5' }}>
            <Typography>{user.login}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {(() => {
              if (isReposError && expandedUser === user.login) {
                return (
                  <Typography color="error">
                    Error loading repositories: {reposError instanceof Error ? reposError.message : 'Unknown error'}
                  </Typography>
                );
              }
              if (loadingRepos && expandedUser === user.login) {
                return <Typography>Loading repositories...</Typography>;
              }
              return (reposMap[user.login] || []).map((repo) => (
                <Card
                  key={repo.id}
                  sx={{
                    mb: 2,
                    backgroundColor: '#eee',
                    wordBreak: 'break-word',
                  }}
                >
                  <CardContent>
                    <Box
                      display="flex"
                      flexDirection={{ xs: 'column', sm: 'row' }}
                      justifyContent="space-between"
                      alignItems={{ xs: 'flex-start', sm: 'center' }}
                      gap={1}
                    >
                      <Typography fontWeight="bold" sx={{ wordBreak: 'break-word' }}>
                        {repo.name}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Typography>{repo.stargazers_count}</Typography>
                        <StarIcon fontSize="small" sx={{ ml: 0.5 }} />
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {repo.description ?? 'No description'}
                    </Typography>
                  </CardContent>
                </Card>
              ));
            })()}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
