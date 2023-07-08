<template>
    <div>
        <h1>Admin</h1>
        <p>This page can only be accessed by administrators.</p>
        <div>
            All users from secure (admin only) api end point:
            
        </div>
    </div>
</template>

<script>
import AuthService from '../../services/auth-user'
import roleUser from '../../services/role-user'
export default {
    
    data () {
        
    },
    mounted() {
    if (roleUser()) 
    if (AuthService()) 
    if (localStorage.getItem('token')) {
   
    } else {
      this.$router.push('/')
    }

   
  },
   
};
</script>