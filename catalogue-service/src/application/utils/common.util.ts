export async function executeInBatches(
    dataArray: any,
    callingFunction: (batch: any) => Promise<void>,
    batchSize: number
  ): Promise<any> {
    const batchPromises = [];
    for (let i = 0; i < dataArray.length; i += batchSize) {
      const batch = dataArray.slice(i, i + batchSize);
      const batchPromise = (async () => {
        await callingFunction(batch);
      })();
      batchPromises.push(batchPromise);
    }
    return await Promise.all(batchPromises);
  }
  