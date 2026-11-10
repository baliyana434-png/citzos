import test from 'node:test';
import assert from 'node:assert/strict';

test('Date Utils: Opportunity Deadline Expiration Logic', async () => {
  const { isOpportunityDeadlinePassed } = await import('../src/lib/dateUtils.ts');
  
  // Future dates should not be passed
  assert.equal(isOpportunityDeadlinePassed('2099-12-31'), false, 'Future deadline must not be passed');
  
  // Past dates should be passed
  assert.equal(isOpportunityDeadlinePassed('2020-01-01'), true, 'Past deadline must be passed');
  
  // Undefined or ongoing deadlines should not be passed
  assert.equal(isOpportunityDeadlinePassed(''), false, 'Empty deadline must not be marked passed');
  assert.equal(isOpportunityDeadlinePassed(undefined), false, 'Undefined deadline must not be marked passed');
});

test('Deduplication: Opportunity Duplicate Prevention', async () => {
  const { deduplicateOpportunities } = await import('../src/utils/opportunityDeduplication.ts');
  
  const sample = [
    { id: 'opp-1', title: 'National Scholarship' },
    { id: 'opp-2', title: 'State Scheme' },
    { id: 'opp-1', title: 'National Scholarship (Duplicate)' },
  ];
  
  const deduped = deduplicateOpportunities(sample);
  assert.equal(deduped.length, 2, 'Must remove duplicate opportunities by ID');
  assert.equal(deduped[0].id, 'opp-1');
  assert.equal(deduped[1].id, 'opp-2');
});
