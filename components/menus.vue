<template>
	<pre>{{ page }}</pre>
</template>

<script setup>
import { useData } from "vitepress";

const { page } = useData();
</script>
