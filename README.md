# voicebin application 

    Voicebin blog application is developed with motive of sharing daily news, latest styles, DIY projects and many more.. which user wants, the world to listen to their post.

## Admin role:

Admin has access expiration and admin access protected routes.
middleware->accessExpriration
middleware->adminAccess

    1. World: This tab displays all approved blogs posted by users around the world. (home page)

    2. Blog status: This tab contains dropdown for blog (pending,approved,rejected) status and searchbar for finding blogs in each mentioned category. Admin need to review the blogs and use approving options (tick-approve,hand-pending,cross-reject) to change the blog status. Only approved blogs goes to world.

    3. Admins: This tab allows all admins to view other admin accounts. It contains,
                (i) revoke admin access - Toggle to remove admin access and move them to users. (Windows confirmation display added)
               (ii) remove admin account - Delete button to remove inactive admin accounts.(Windows confirmation display added)

    4. Users:   This tab allows all admins to view active users of voicebin blog app. It contains,
                (i) grant admin access - Toggle to provide admin access and add them to admin list.(Windows confirmation display added)
    
    5. Logout: This tab allows admins to logout from their account and navigate to voicebin home page.(confirmation prompt added)

### Admin credentials

    username: admin
    password:admin123

#### User role:

User has user access protected routes.
middleware->userAccess

    1.World: This tab displays all approved blogs posted by users around the world. (home page)

    2.Post: This tab allows users to create a new blog post with title, description and image. It also contains preview for view post before sending for approval.

    3.My Post: This tab displays all blog posts created by individual users irrespective of blog status. It also contains option to delete the blog post with window confirmation prompt.

    4.Search: Unlike World tab. This search tab contains search bar options allowing users to find specific blog posts and read them. It contains only approved blog posts.

    5.Settings: This tab contains user setting options to edit user details including login username (unique). 

    6.Logout: This tab allows users to logout from their account and navigate to voicebin home page.(confirmation prompt added)

