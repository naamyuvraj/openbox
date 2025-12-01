const API_BASE_URL = 'https://openbox-r8z3.onrender.com';

function getAuthToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

function saveAuthToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
}

function clearAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
}

export async function register(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export async function login(credentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    if (data.token) {
      saveAuthToken(data.token);
    }

    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

export function googleLogin() {
  window.location.href = `${API_BASE_URL}/api/auth/google`;
}

export async function getAuthProfile() {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get profile');
    }

    return data;
  } catch (error) {
    console.error('Error getting profile:', error);
    throw error;
  }
}

export function logout() {
  clearAuthToken();
}

export async function createProject(projectData) {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create project');
    }

    return data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export async function getUserProjects() {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get projects');
    }

    return data;
  } catch (error) {
    console.error('Error getting projects:', error);
    throw error;
  }
}

export async function getProjectById(projectId) {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get project');
    }

    return data;
  } catch (error) {
    console.error('Error getting project:', error);
    throw error;
  }
}

export async function addCollaborator(projectId, collaboratorData) {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/projects/collaborators/${projectId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(collaboratorData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to add collaborator');
    }

    return data;
  } catch (error) {
    console.error('Error adding collaborator:', error);
    throw error;
  }
}

export async function getUserProfile() {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get user profile');
    }

    return data;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}

export async function updateUserProfile(profileData) {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update profile');
    }

    return data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

export async function getFileById(fileId) {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/api/files/${fileId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get file');
    }

    return data;
  } catch (error) {
    console.error('Error getting file:', error);
    throw error;
  }
}

export async function getFileHistory(fileId) {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/api/files/${fileId}/history`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get file history');
    }

    return data;
  } catch (error) {
    console.error('Error getting file history:', error);
    throw error;
  }
}

export async function commitChanges(formData) {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/api/commits`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to commit changes');
    }

    return data;
  } catch (error) {
    console.error('Error committing changes:', error);
    throw error;
  }
}

export async function getCommit(commitId) {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/api/commits/${commitId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get commit');
    }

    return data;
  } catch (error) {
    console.error('Error getting commit:', error);
    throw error;
  }
}

export async function getAllCommits(repoId) {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/api/commits/repo/${repoId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get commits');
    }

    return data;
  } catch (error) {
    console.error('Error getting commits:', error);
    throw error;
  }
}

export async function getCommitDiff(commitId) {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/api/commits/${commitId}/diff`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get commit diff');
    }

    return data;
  } catch (error) {
    console.error('Error getting commit diff:', error);
    throw error;
  }
}

export function isAuthenticated() {
  const token = getAuthToken();
  return token !== null && token !== undefined && token !== '';
}

export const API_URL = API_BASE_URL;