export const GET_ROADMAPS_BY_USER = `
    SELECT 
        r.*,
        urp.status, 
        urp.node_id as current_node,
        COALESCE((
            SELECT SUM(l.xp_reward)::INTEGER
            FROM roadmap_nodes rn
            JOIN roadmap_node_lesson rnl ON rnl.roadmap_node_id = rn.roadmap_node_id
            JOIN lesson l ON l.lesson_id = rnl.lesson_id
            WHERE rn.roadmap_id = r.id
        ), 0) as xp,
        
        COALESCE((
            SELECT COUNT(DISTINCT rnl.lesson_id)::INTEGER
            FROM roadmap_nodes rn
            JOIN roadmap_node_lesson rnl ON rnl.roadmap_node_id = rn.roadmap_node_id
            WHERE rn.roadmap_id = r.id
        ), 0) as total_lessons,
        
        COALESCE((
            SELECT COUNT(DISTINCT rnl.lesson_id)::INTEGER
            FROM roadmap_nodes rn
            JOIN roadmap_node_lesson rnl ON rnl.roadmap_node_id = rn.roadmap_node_id
            JOIN user_lesson_progress ulp ON ulp.lesson_id = rnl.lesson_id
            WHERE rn.roadmap_id = r.id 
                AND ulp.user_id = $1
                AND ulp.completed_at IS NOT NULL
        ), 0) as completed_lessons,
        
        COALESCE((
            SELECT SUM(l.duration_minutes)::INTEGER
            FROM roadmap_nodes rn
            JOIN roadmap_node_lesson rnl ON rnl.roadmap_node_id = rn.roadmap_node_id
            JOIN lesson l ON l.lesson_id = rnl.lesson_id
            LEFT JOIN user_lesson_progress ulp 
                ON ulp.lesson_id = rnl.lesson_id 
                AND ulp.user_id = $1
            WHERE rn.roadmap_id = r.id 
                AND ulp.completed_at IS NULL
        ), 0) as remaining_time_minutes

    FROM roadmap r
    LEFT JOIN user_roadmap_progress urp 
        ON r.id = urp.roadmap_id 
        AND urp.user_id = $1
    WHERE r.title LIKE $2
    AND ($3::VARCHAR IS NULL OR r.roadmap_tag_id = (SELECT roadmap_tag_id FROM roadmap_tag WHERE title = $3));
`;

export const GET_ROADMAP_BY_SLUG = `
    SELECT 
        r.*,
        urp.status, 
        urp.node_id as current_node
    FROM roadmap r
    LEFT JOIN user_roadmap_progress urp 
        ON r.id = urp.roadmap_id
    WHERE r.slug = $1;
`;

export const GET_ROADMAP_NODES = `
    SELECT * FROM roadmap_nodes
    WHERE roadmap_id = $1
    ORDER BY position_x, position_y;
`;

export const GET_ROADMAP_CONNECTIONS = `
    SELECT * FROM roadmap_edges
    WHERE roadmap_id = $1;
`;

export const GET_NODE_BY_ID = `
    SELECT 
        n.*,
        COALESCE(urp.status, 'locked') as user_status
    FROM roadmap_nodes n
    LEFT JOIN user_roadmap_progress urp 
        ON n.roadmap_node_id = urp.node_id 
    WHERE n.roadmap_node_id = $1;
`;

export const GET_NODE_LESSONS = `
    SELECT 
        l.*,
        CASE 
            WHEN ul.completed_at IS NOT NULL THEN 'completed'
            WHEN ul.user_id IS NOT NULL THEN 'in_progress'
            ELSE 'locked'
        END as status,
        CASE 
            WHEN ul.completed_at IS NOT NULL THEN l.xp_reward
            ELSE 0
        END as xp_earned
    FROM roadmap_node_lesson rnl
    JOIN lesson l ON rnl.lesson_id = l.lesson_id
    LEFT JOIN user_lesson_progress ul 
        ON l.lesson_id = ul.lesson_id 
    WHERE rnl.roadmap_node_id = $1
    ORDER BY rnl.sort_order;
`;

export const GET_NODE_STATS = `
    SELECT 
        COUNT(*) as total_lessons,
        COUNT(CASE WHEN ul.completed_at IS NOT NULL THEN 1 END) as completed_lessons,
        COALESCE(SUM(CASE WHEN ul.completed_at IS NOT NULL THEN l.xp_reward ELSE 0 END), 0) as total_xp_earned,
        COALESCE(SUM(CASE WHEN ul.completed_at IS NULL THEN l.duration_minutes ELSE 0 END), 0) as remaining_minutes
    FROM roadmap_node_lesson rnl
    JOIN lesson l ON rnl.lesson_id = l.lesson_id
    LEFT JOIN user_lesson_progress ul 
        ON l.lesson_id = ul.lesson_id 
    WHERE rnl.roadmap_node_id = $1;
`;

export const GET_ALL_TAGS = `
    SELECT * FROM roadmap_tag;
`;
