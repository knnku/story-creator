-- Users table seeds here
INSERT INTO contributions
  (
    story_id,
    votes,
    story_proposal,
    date_created,
    proposal_status
  )
VALUES
  (
    1,
    0,
    'There was a dragon within the dungeon hoarding gold and always sleeping.',
    Now(), -- can also be set as default within the schema create
    false, -- false: meaning not accepted by default? true: when accepted to story
  );
