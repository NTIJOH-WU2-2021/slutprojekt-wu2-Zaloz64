import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Landingpage from "../views/Landingpage.vue";
import Profile from "../views/Profile.vue";
import Album from "../views/Album.vue";



const routes = [
    {
        path: "/Colection",
        name: "Home",
        component: Home,
    },
    {
        path: "/Profile",
        name: "Profile",
        component: Profile,
    },
    {
        path: "/",
        name: "Landingpage",
        component: Landingpage,
    },
    {
        path: "/album/:id",
        name: "Album",
        component: Album,
    }
    
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
  
export default router;