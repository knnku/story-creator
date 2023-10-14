-- Users table seeds here
INSERT INTO stories (user_id, main_story, title, story_status, date_created, date_completed)
VALUES
(1, 'Once upon a time, in a land far, far away...', 'The Distant Kingdom', TRUE, '2023-01-01 10:00:00', Now()),
(2, 'In a bustling city, a young artist named Mia...', 'Dreams of the Canvas', FALSE, '2023-02-15 14:30:00', Now()),
(2, 'Amidst the endless cosmos, a spaceship...', 'Voyage to the Unknown', FALSE, '2023-05-10 18:20:00', Now());

