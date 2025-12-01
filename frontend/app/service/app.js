const API_BASE_URL = "https://openbox-r8z3.onrender.com";

function getAuthToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

function saveAuthToken(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
}

function clearAuthToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}

// -----------------------------
// REGISTER
// -----------------------------
export async function register(userData) {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Registration failed");
  }

  return data;
}

// -----------------------------
// LOGIN
// -----------------------------
export async function login(credentials) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Login failed");
  }

  if (data.token) {
    saveAuthToken(data.token);
  }

  return data;
}

export function googleLogin() {
  window.location.href = `${API_BASE_URL}/api/auth/google`;
}

// -----------------------------
// AUTH PROFILE
// -----------------------------
export async function getAuthProfile() {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Failed to get profile");
  }

  return data;
}

export function logout() {
  clearAuthToken();
}

// -----------------------------
// REMAINING API CALLS (unchanged except improved errors)
// -----------------------------
export async function createProject(projectData) {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || data.error);
  return data;
}

export async function getUserProjects() {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || data.error);
  return data;
}

export async function getProjectById(projectId) {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || data.error);
  return data;
}

export async function addCollaborator(projectId, collaboratorData) {
  const token = getAuthToken();

  const response = await fetch(
    `${API_BASE_URL}/projects/collaborators/${projectId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(collaboratorData),
    }
  );

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || data.error);
  return data;
}

export async function getUserProfile() {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/user/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || data.error);
  return data;
}

export async function updateUserProfile(profileData) {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || data.error);
  return data;
}

export async function getFileById(fileId) {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/api/files/${fileId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || data.error);
  return data;
}

export async function getFileHistory(fileId) {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/api/files/${fileId}/history`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || data.error);
  return data;
}

export async function commitChanges(formData) {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/api/commits`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || data.error);
  return data;
}

export async function getCommit(commitId) {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/api/commits/${commitId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || data.error);
  return data;
}

export async function getAllCommits(repoId) {
  const token = getAuthToken();

  const response = await fetch(
    `${API_BASE_URL}/api/commits/repo/${repoId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || data.error);
  return data;
}

export async function getCommitDiff(commitId) {
  const token = getAuthToken();

  const response = await fetch(
    `${API_BASE_URL}/api/commits/${commitId}/diff`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || data.error);
  return data;
}

export function isAuthenticated() {
  const token = getAuthToken();
  return token !== null && token !== "";
}

export const API_URL = API_BASE_URL;
