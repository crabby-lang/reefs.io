<template>
    <section class="support">
        <h1>🩷 Support reefs.io! 🩷</h1>
        <p class="subtitle">
            A small but ambitious <b>Open Source</b> project built with passion and dedication.
        </p>

        <div class="cards">
            <div class="card">
                <h2>🦀 About the Creator</h2>
                <p>
                    Hello! I'm a 17 year old student currently in Senior High (struggling also unfortunately). reefs.io and Crabby are my personal projects built while learning systems programming, web development, language / compiler theories, and infrastructure - often between school pressure and limited resources (e.g finance, hardware, servers, hosting, etc.)
                </p>
            </div>
            <div class="card">
                <h2>🪸 What is reefs.io?</h2>
                <p>
                    reefs.io is a package and library hub for the Crabby programming language. Inspired by crates.io, reefs.io aims to be fast, simple and transparent - without any unnecessary bloat with bullshit in it. 
                </p>
            </div>
            <div class="card">
                <h2>🤔 "How can I support?"</h2>
                <ul>
                    <li>Star the repository on Github.</li>
                    <li>Report bugs on issues.</li>
                    <li>Test early features or others.</li>
                    <li>Share the project with your friends or peers!</li>
                </ul>
                <p class="note">
                    Monetary support is not required - encouragement and feedbacks helps me a lot!
                </p>
            </div>

            <div class="card">
                <h2>⏰ The Future of reefs.io</h2>
                <p>
                    The goal is to grow reefs.io slowly and responsibly: better package validation, stronger security, and eventually a stable public registry. This project is still very young and as the programming language - just like the creator.
                </p>
            </div>

            <div class="links">
                <a href="https://github.com/crabby-lang/reefs.io">
                    Github Repository
                </a>
                <a href="/docs">Documentations</a>
                <a href="/status">Project Status</a>
            </div>
        </div>
    </section>
</template>

<style scoped>
.support {
    max-width: 900px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    color: #eb6f0a;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

.subtitle {
    color: #fffefe;
    margin-bottom: 0.5rem;
}

.cards {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.card {
    background: #fff;
    border: 1px solid #eaeaea;
    border-color: #ec660c;
    border-radius: 12px;
    padding: 1.5rem;
}

.card h2 {
    margin-bottom: 0.75rem;
}

.card p, .card ul {
    color: #000000d0;
    font-size: 0.95rem;
}

.card ul {
    padding-left: 1.2rem;
}

.note {
    margin-top: 0.75rem;
    font-size: 0.85rem;
    color: #000000;
}

.links {
    margin-top: 3rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.links a {
    text-decoration: none;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    background: #111;
    color: #fff;
    font-size: 0.9rem;
}

</style>
