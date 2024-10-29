# voicebin application 

# Admin task and access : 

Admin has following access - accessExpriration, adminAccess

 1. Blog approval task. /admin/blog/:approveblog (blogId)
 2. Access to view all approval pending blogs. /admin/blog/pendingblogs
 3. Access to view all rejected blogs. /admin/blog/rejectedblogs
 4. Access to view all blogs. /admin/blog/all
 5. Access to view all users in application. /admin/users
 6. Access to view all Admins in application. /admin/admins
 7. To provide admin access to new users. /admin/user/:adminaccess (userId)
 8. To revoke admin access to any admin account. /admin/:revokeaccess (userId)
 9. Access to remove admin account. /admin/:removeadmin (userId)
 
 # User task and access : 

 Use has following access - userAccess

 1. Report all blogs for own Id - /blogs/:id (userId)
 2. Home feed for blogs that are approved by admin - /blogs/approvedblogs
 3. Search for any blog globally - /blogs/search
 4. Create a new blog post - /blogs
 5. personalize their profile ID - /users/:editprofile (userName)
 6. Permission to remove their profile account - /users/:removeaccount (userId)
