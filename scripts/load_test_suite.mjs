import autocannon from 'autocannon';
import os from 'os';

const TARGET_HOST = 'http://localhost:3000';

async function runStage(title, connections, durationSeconds, url = `${TARGET_HOST}/`) {
  console.log(`\n======================================================`);
  console.log(`Running Load Test Tier: ${title} (${connections} concurrent users)`);
  console.log(`Target: ${url} | Duration: ${durationSeconds}s`);
  console.log(`======================================================`);

  return new Promise((resolve) => {
    const instance = autocannon({
      url,
      connections,
      duration: durationSeconds,
      pipelining: 1,
      timeout: 10,
    }, (err, result) => {
      if (err) {
        console.error(`Error during ${title}:`, err);
        resolve({ title, connections, error: err.message });
      } else {
        const p50 = result.latency.p50;
        const p95 = result.latency.p95 || result.latency.p97_5 || result.latency.p90;
        const p99 = result.latency.p99;
        const avg = result.latency.average;
        const rps = result.requests.average;
        const totalReqs = result.requests.total;
        const errors = result.errors;
        const timeouts = result.timeouts;
        const errorRate = ((errors + timeouts) / (totalReqs || 1) * 100).toFixed(2);
        const throughputMB = (result.throughput.average / (1024 * 1024)).toFixed(2);

        console.log(`[RESULTS for ${title}]:`);
        console.log(`- Total Requests: ${totalReqs}`);
        console.log(`- Requests/sec: ${rps.toFixed(1)} req/s`);
        console.log(`- Throughput: ${throughputMB} MB/s`);
        console.log(`- Latency (Avg): ${avg.toFixed(1)} ms`);
        console.log(`- Latency (P50): ${p50} ms`);
        console.log(`- Latency (P95): ${p95} ms`);
        console.log(`- Latency (P99): ${p99} ms`);
        console.log(`- Errors / Timeouts: ${errors} errors, ${timeouts} timeouts (Error rate: ${errorRate}%)`);

        resolve({
          title,
          connections,
          totalReqs,
          rps: Number(rps.toFixed(1)),
          throughputMB: Number(throughputMB),
          avgLatencyMs: Number(avg.toFixed(1)),
          p50Ms: p50,
          p95Ms: p95,
          p99Ms: p99,
          errors,
          timeouts,
          errorRate: Number(errorRate)
        });
      }
    });

    autocannon.track(instance, { renderProgressBar: false });
  });
}

async function main() {
  console.log('CITZOS PRODUCTION LOAD & STRESS TESTING HARNESS');
  console.log(`Platform: ${os.platform()} (${os.arch()}) | CPU Cores: ${os.cpus().length}`);
  console.log(`Memory: ${(os.totalmem() / (1024**3)).toFixed(1)} GB | Staging Host: ${TARGET_HOST}`);

  const results = [];

  // Tier 1: 100 Concurrent Users (Baseline Peak)
  results.push(await runStage('Tier 1: 100 Concurrent Users', 100, 10));

  // Tier 2: 500 Concurrent Users (Medium Spike)
  results.push(await runStage('Tier 2: 500 Concurrent Users', 500, 10));

  // Tier 3: 1,000 Concurrent Users (High Traffic)
  results.push(await runStage('Tier 3: 1,000 Concurrent Users', 1000, 10));

  // Tier 4: 5,000 Concurrent Users (Heavy Viral Event)
  results.push(await runStage('Tier 4: 5,000 Concurrent Users', 5000, 10));

  // Tier 5: 10,000 Concurrent Users (Stress / Breakpoint Test)
  // On desktop Windows, check if socket limits allow 10k connections
  try {
    results.push(await runStage('Tier 5: 10,000 Concurrent Users', 10000, 10));
  } catch (e) {
    console.warn('Tier 5 socket error or OS connection limit reached:', e.message);
  }

  // Tier 6: API Endpoint Stress (System Status & Opportunity Discovery API)
  results.push(await runStage('API Tier: 500 Users on /api/admin/system-status', 500, 8, `${TARGET_HOST}/api/admin/system-status`));

  console.log('\n======================================================');
  console.log('ALL LOAD TESTING TIERS COMPLETE');
  console.log('======================================================');
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
