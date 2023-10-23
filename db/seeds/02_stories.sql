-- Users table seeds here
INSERT INTO stories (user_id, main_story, title, story_status, date_created, date_completed)
VALUES
(1, 'In long time ago in a galaxy far, far away...', 'Star Wars', FALSE, '2023-05-10', Now()),
(2, 'Amidst the endless cosmos, a spaceship...', 'Voyage to the Unknown', FALSE, '2023-05-10', Now()),
(2, 'In a bustling city, a young artist named Mia...', 'Dreams of the Canvas', FALSE, '2023-02-15', Now()),
(1, 'Once upon a time, in a land far, far away...', 'The Distant Kingdom', TRUE, '2023-01-01', Now());
