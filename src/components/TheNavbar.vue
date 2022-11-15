<template>
    <b-navbar :container="true" fixed="top" toggleable="md" type="light" variant="warning">
        <b-navbar-brand to="/">MEVN-posts</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/">Посты</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script setup lang="ts"></script>

<style scoped></style>
