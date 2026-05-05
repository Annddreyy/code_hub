<template>
    <aside class="right-sidebar">
        <div class="right-sidebar__sec">
            <div class="right-sidebar__lbl">// на этой странице</div>
            <a
                v-for="item in navItems"
                :key="item.href"
                :href="item.href"
                :class="[
                    'right-sidebar__link',
                    {
                        'right-sidebar__link--sub': item.sub,
                        'right-sidebar__link--on': activeId === item.href.slice(1),
                    },
                ]"
                @click.prevent="scrollToSection(item.href)"
            >
                {{ item.label }}
            </a>
        </div>
    </aside>
</template>

<script setup lang="ts">
const activeId = ref('s1');
let observer: ResizeObserver | null = null;

const navItems = [
    { href: '#s1', label: 'Что такое Flexbox?', sub: false },
    { href: '#s2', label: 'Flex контейнер', sub: false },
    { href: '#s3', label: 'flex-направление', sub: true },
    { href: '#s4', label: 'justify-content', sub: true },
    { href: '#s5', label: 'align-items', sub: true },
    { href: '#s6', label: 'flex сокращеная запись', sub: true },
    { href: '#s7', label: 'Тест', sub: false },
];

const setupIntersectionObserver = () => {
    const sections = navItems
        .map((item) => document.getElementById(item.href.slice(1)))
        .filter((el) => el !== null);

    observer = new IntersectionObserver(
        (entries) => {
            const visibleSections = entries.filter((entry) => entry.isIntersecting);

            if (visibleSections.length > 0) {
                const activeSection = visibleSections[0];
                if (activeSection?.target.id) {
                    activeId.value = activeSection?.target.id;
                }
            }
        },
        {
            threshold: 0.3,
        },
    );

    sections.forEach((section) => {
        if (section && observer) {
            observer.observe(section);
        }
    });
};

const scrollToSection = (href: string) => {
    const targetId = href.slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

        activeId.value = targetId;
        history.pushState(null, '', href);
    }
};

onMounted(() => {
    setupIntersectionObserver();
});

onBeforeUnmount(() => {
    if (observer) {
        observer.disconnect();
    }
});
</script>

<style lang="scss" scoped>
.right-sidebar {
    position: sticky;
    top: var(--nav-h);
    height: calc(100vh - var(--nav-h));

    flex-shrink: 0;

    max-width: 200px;
    padding: 24px 20px;

    border-left: 1px solid var(--b1);
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--s3);
    }

    &__sec {
        margin-bottom: 24px;
    }

    &__lbl {
        margin-bottom: 10px;
        padding-bottom: 8px;

        font-family: 'Space Mono', monospace;
        font-size: 8px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--muted);

        border-bottom: 1px solid var(--b1);
    }

    &__link {
        display: block;

        margin-bottom: 1px;
        padding: 5px 8px;

        font-size: 12px;
        text-decoration: none;
        color: var(--muted);

        border-left: 2px solid transparent;
        border-radius: 0 4px 4px 0;

        transition: all 0.15s;

        &:hover {
            color: var(--text2);
            background: rgba(255, 255, 255, 0.03);
        }

        &--on {
            color: var(--blue);
            border-left-color: var(--blue);
            background: rgba(79, 156, 255, 0.05);
        }

        &--sub {
            padding-left: 18px;

            font-size: 11px;
        }
    }
}

@media (max-width: 1220px) {
    .right-sidebar {
        display: none;
    }
}
</style>
