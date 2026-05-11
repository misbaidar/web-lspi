// FIRESTORE SECURITY RULES FOR COMMENTS
// Add this to your Firestore Rules in the Firebase Console

/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Comments Collection Rules
    match /comments/{commentId} {
      // Read: Allow everyone to read comments
      allow read: if true;
      
      // Create: Allow anyone to create if content is not empty and within limits
      allow create: if request.auth != null || request.auth == null
                     && request.resource.data.content.size() > 0
                     && request.resource.data.content.size() <= 500
                     && request.resource.data.articleId is string
                     && request.resource.data.authorName is string
                     && request.resource.data.createdAt is timestamp;
      
      // Update: Only admin can update (optional, usually not needed for comments)
      allow update: if false;
      
      // Delete: Only admin can delete (optional)
      allow delete: if false;
    }

    // Other existing rules...
    // match /articles/{document=**} {
    //   allow read: if true;
    //   allow write: if false;
    // }
  }
}
*/

// ALTERNATIVE SIMPLER RULES (More permissive):
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Comments Collection - Public Read, Guest Write
    match /comments/{commentId} {
      allow read: if true;
      allow create: if request.resource.data.content.size() > 0 
                     && request.resource.data.content.size() <= 500;
      allow update, delete: if false;
    }
  }
}
*/
