export const GET_ALL_TOPICS_QUERY = `
    SELECT 
        challenge_topic_id as id,
        slug,
        name,
        color_hex
    FROM challenge_topic
    ORDER BY name ASC
`;

export const GET_CHALLENGES_STATS_QUERY = `
    SELECT 
        COUNT(CASE WHEN user_challenge.status = 'done' THEN 1 END) as completed_count,
        COUNT(CASE WHEN user_challenge.status = 'in-progress' THEN 1 END) as pending_count,
        COUNT(CASE WHEN challenge.difficulty = 'hard' THEN 1 END) as hard_count,
        COUNT(CASE WHEN challenge.difficulty = 'medium' THEN 1 END) as medium_count,
        COUNT(CASE WHEN challenge.difficulty = 'easy' THEN 1 END) as easy_count,
        COUNT(DISTINCT challenge.id) as total_count,
        ROUND(
            (COUNT(CASE WHEN user_challenge.status = 'done' THEN 1 END)::numeric / 
            NULLIF(COUNT(DISTINCT challenge.id), 0) * 100), 2
        ) as completion_percentage
    FROM challenge
    LEFT JOIN user_challenge ON user_challenge.challenge_id = challenge.id 
        AND user_challenge.user_id = $1
`;
