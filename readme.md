// yeh sara backend routes hain 
// All protected routes use JWT:
//   Authorization: Bearer <token>
// auth: (/api/auth)
//
// post /api/auth/register
//   body:
//     {
//       "name": string,
//       "email": string,
//       "password": string,
//       "username"?: string
//     }
//
// post /api/auth/login
//   body (JSON):
//     {
//       "email": string,
//       "password": string
//     }

//
// get /api/auth/google
//
// get /api/auth/google/callback

//
// get /api/auth/profile
//   headers: Authorization: Bearer <token>
//
// repos (/projects)
//
// post /projects
//   Body (JSON):
//     {
//       "name": string,
//       "description"?: string
//     }
//
// get /projects
//   Returns all projects of the logged‑in user.

//
// get /projects/:id
//   Returns single project by id.

//
// post /projects/collaborators/:id
//   Body (JSON):
//     {
//       "collaboratorId": string   // user _id
//     }

//
// profile (/user)
// get /user/profile
//
//
// files (/api/files)
//
// get /api/files/:id
//
// get /api/files/:id/history
//   Response:
//     { "commits": CommitDocument[] }
//
// COMMITS & ZIP UPLOAD (/api/commits)
//
// post /api/commits
//
// get /api/commits/:id
//
// get /api/commits/repo/:repoId
