<script setup lang="ts">
import {
  TheDropDownNavbar,
  TheDropDownMenu,
  TheDropDownItem,
} from "vue3-dropdown-navbar";
import { ref } from "vue";
const theme = ref<any>(true);
const dropdownMenu = ref<InstanceType<typeof TheDropDownMenu>>();
const toggleDarkMode = () => {
    theme.value = document.getElementById('navbar')?.classList.toggle('dd-nav-dark');
};

</script>

<template>
    <div id="navbar" class="dd-nav-dark">
        <TheDropDownNavbar>
            <template #logo>
                <TheDropDownNavbarLogo>MetierVerse</TheDropDownNavbarLogo>
            </template>
            <TheDropDownItem link="/home">Home</TheDropDownItem>
            <TheDropDownMenu text="Dropdown 1" ref="dropdownMenu">
                <TheDropDownItem>Dropdown Item 1</TheDropDownItem>
                <TheDropDownItem>Dropdown Item 2</TheDropDownItem>
                <TheDropDownMenu text="Dropdown Item 3">
                    <TheDropDownItem>Dropdown Item 3-1</TheDropDownItem>
                    <TheDropDownItem>Dropdown Item 3-2</TheDropDownItem>
                </TheDropDownMenu>
            </TheDropDownMenu>
            <TheDropDownItem @click="toggleDarkMode">{{theme ? 'Toggle Light Mode' : 'Toggle Dark Mode'}}</TheDropDownItem>
            <TheDropDownItem link="/register">Register</TheDropDownItem>
            <TheDropDownItem link="/login">Login</TheDropDownItem>
        </TheDropDownNavbar>
    </div>    
</template>