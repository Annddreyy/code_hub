export const GET_TAGS_QUERY = `
    SELECT
        title,
        COUNT(*) as count
    FROM (
        SELECT UNNEST(tags) as title
        FROM course
        WHERE tags IS NOT NULL
    ) as t
    GROUP BY title
    ORDER BY count DESC, title;
`;

export const GET_TECHNOLOGIES_QUERY = `
    SELECT
        title,
        COUNT(*) as count
    FROM (
        SELECT UNNEST(technologies) as title
        FROM course
        WHERE technologies IS NOT NULL
    ) as t
    GROUP BY title
    ORDER BY count DESC, title;
`;
