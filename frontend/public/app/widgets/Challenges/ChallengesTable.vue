<template>
    <div class="table-wrapper">
        <table class="chellenges-table">
            <thead>
                <tr>
                    <th style="width: 36px">#</th>
                    <th style="width: 28px" />
                    <th>Задача</th>
                    <th style="width: 80px">Сложность</th>
                    <th>Темы</th>
                    <th style="width: 80px; text-align: center">Принято %</th>
                    <th style="width: 60px; text-align: center">XP</th>
                    <th
                        class="challenges-table__button-cell"
                        style="width: 90px"
                    />
                </tr>
            </thead>
            <tbody>
                <ChallengeRow
                    v-for="challenge in challenges"
                    :key="challenge.id"
                    v-bind="challenge"
                />
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import type { Challenge } from '@/entities/challenge';
import { ChallengeRow } from '@/entities/challenge';

defineProps<{
    challenges: Challenge[];
}>();
</script>

<style lang="scss" scoped>
.table-wrap {
    flex: 1;
    padding: 0 28px 32px;

    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: var(--s3);
    }
}

.chellenges-table {
    width: 100%;
    margin-top: 12px;

    border-collapse: collapse;
    animation: fadeUp 0.4s 0.05s ease both;

    th {
        position: sticky;
        top: 0;
        padding: 10px 12px;

        font-family: var(--sm);
        font-size: 8px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        text-align: left;
        color: var(--muted);

        border-bottom: 1px solid var(--b2);
        background: var(--bg);

        z-index: 10;

        &:first-child {
            width: 36px;
        }
    }

    td {
        padding: 0;
        border-bottom: 1px solid var(--b1);
        vertical-align: middle;
    }

    tbody {
        tr {
            &:hover {
                td {
                    background: rgba(255, 255, 255, 0.018);
                }
            }
            &:last-child {
                td {
                    border-bottom: none;
                }
            }
        }
    }
}

@media (max-width: 1220px) {
    .challenges-table {
        &__button-cell {
            display: none;
        }
    }
}

@media (max-width: 768px) {
    .table-wrapper {
        display: none;
    }
}
</style>
