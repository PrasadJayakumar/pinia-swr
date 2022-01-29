let counterWeatherData = 0;

export const queryWeatherData = (args) => {
  counterWeatherData++;
  console.log(`queryWeatherData: ${counterWeatherData}`);
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { id: 1001, name: 'San Ramon', temperature: 18 },
          { id: 1001, name: 'Livermore', temperature: 17 }
        ]),
      2000
    );
  });
};
