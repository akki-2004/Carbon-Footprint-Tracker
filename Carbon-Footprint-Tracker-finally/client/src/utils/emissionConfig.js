export const emissionConfig = {
    transportation: {
      modes: {
        walking: { emission: 0, points: 10 },
        bicycle: { emission: 0, points: 10 },
        bus: { emission: 0.05, points: 8 },
        metro: { emission: 0.03, points: 9 },
        auto: { emission: 0.1, points: 5 },
        bike: { emission: 0.15, points: 4 },
        car: { emission: 0.2, points: 3 },
        cab: { emission: 0.25, points: 2 },
        flight: { emission: 0.3, points: 1 },
      },
      vehicleTypes: {
        none: { emission: 0, points: 10 },
        petrolBike: { emission: 0.15, points: 4 },
        electricBike: { emission: 0.02, points: 9 },
        petrolCar: { emission: 0.2, points: 3 },
        dieselCar: { emission: 0.25, points: 2 },
        cngCar: { emission: 0.1, points: 6 },
        ev: { emission: 0.05, points: 8 },
      },
      carpool: {
        yes: { reduction: 0.2, points: 5 },
        no: { reduction: 0, points: 0 },
      },
      rideSharing: {
        yes: { reduction: 0.1, points: 3 },
        no: { reduction: 0, points: 0 },
      },
    },
    food: {
      mealTypes: {
        vegetarian: { emission: 0.5, points: 8 },
        nonVegetarian: { emission: 2.0, points: 3 },
        vegan: { emission: 0.3, points: 10 },
      },
      nonVegOptions: {
        eggs: { emission: 1.0, points: 5 },
        chicken: { emission: 1.5, points: 4 },
        mutton: { emission: 2.5, points: 3 },
        fish: { emission: 1.2, points: 4 },
        beef: { emission: 3.0, points: 2 },
      },
      ateOutside: {
        yes: { emission: 0.5, points: 2 },
        no: { emission: 0, points: 5 },
      },
      orderedOnline: {
        yes: { emission: 0.3, points: 3 },
        no: { emission: 0, points: 5 },
      },
      foodWaste: {
        none: { emission: 0, points: 10 },
        aLittle: { emission: 0.5, points: 5 },
        aLot: { emission: 1.0, points: 2 },
      },
      dairy: {
        yes: { emission: 0.5, points: 3 },
        no: { emission: 0, points: 5 },
      },
      processedFood: {
        yes: { emission: 0.3, points: 3 },
        no: { emission: 0, points: 5 },
      },
      reusableContainers: {
        yes: { reduction: 0.5, points: 5 },
        no: { reduction: 0, points: 0 },
      },
      compost: {
        yes: { reduction: 0.5, points: 5 },
        no: { reduction: 0, points: 0 },
      },
    },
    energy: {
      fan: { emissionPerHour: 0.05 },
      ac: { emissionPerHour: 0.2 },
      temperatureAdjustment: { emissionPerDegree: 0.05 },
      turnedOffAppliances: {
        yes: { reduction: 0.2, points: 5 },
        no: { reduction: 0, points: 0 },
      },
      renewableEnergy: {
        yes: { reduction: 0.5, points: 10 },
        no: { reduction: 0, points: 0 },
      },
      turnedOffLights: {
        yes: { reduction: 0.1, points: 3 },
        no: { reduction: 0, points: 0 },
      },
    },
    water: {
      sources: {
        borewell: { emission: 0.01, points: 5 },
        municipal: { emission: 0.02, points: 4 },
        tanker: { emission: 0.05, points: 3 },
        rainwater: { emission: 0, points: 10 },
        recycled: { emission: 0.01, points: 8 },
      },
      bath: {
        shortShower: { emission: 0.1, points: 7 },
        longShower: { emission: 0.3, points: 3 },
        bucket: { emission: 0.05, points: 10 },
      },
      bottledWater: { emissionPerLiter: 0.1 },
      roPurifier: {
        yes: { emission: 0.2, points: 5 },
        no: { emission: 0, points: 8 },
      },
      reuseRejectedWater: {
        yes: { reduction: 0.5, points: 5 },
        no: { reduction: 0, points: 0 },
      },
      waterSaving: {
        yes: { reduction: 0.2, points: 5 },
        no: { reduction: 0, points: 0 },
      },
      waterIntensiveActivities: {
        yes: { emission: 1.0, points: 2 },
        no: { emission: 0, points: 5 },
      },
    },
    waste: {
      segregate: {
        yes: { reduction: 0.2, points: 5 },
        no: { reduction: 0, points: 0 },
      },
      compost: {
        yes: { reduction: 0.5, points: 10 },
        no: { reduction: 0, points: 0 },
      },
      recycle: {
        yes: { reduction: 0.3, points: 7 },
        no: { reduction: 0, points: 0 },
      },
      eWaste: {
        yes: { reduction: 0.5, points: 10 },
        no: { reduction: 0, points: 0 },
      },
      avoidSingleUsePlastic: {
        yes: { reduction: 0.2, points: 5 },
        no: { reduction: 0, points: 0 },
      },
      reusableItems: {
        yes: { reduction: 0.3, points: 7 },
        no: { reduction: 0, points: 0 },
      },
      reduceWaste: {
        yes: { reduction: 0.2, points: 5 },
        no: { reduction: 0, points: 0 },
      },
    },
    sustainability: {
      ecoFriendlyActions: {
        plantedTree: { reduction: 0.5, points: 10 },
        publicTransport: { reduction: 0.3, points: 8 },
        avoidedPlastic: { reduction: 0.2, points: 7 },
        reducedFoodWaste: { reduction: 0.2, points: 7 },
        renewableEnergy: { reduction: 0.5, points: 10 },
        other: { reduction: 0.1, points: 5 },
      },
      ecoFriendlyPurchases: {
        yes: { reduction: 0.2, points: 5 },
        no: { reduction: 0, points: 0 },
      },
      communityInitiatives: {
        yes: { reduction: 0.3, points: 7 },
        no: { reduction: 0, points: 0 },
      },
      carbonOffset: {
        yes: { reduction: 0.5, points: 10 },
        no: { reduction: 0, points: 0 },
      },
      learnOrShare: {
        yes: { reduction: 0.1, points: 5 },
        no: { reduction: 0, points: 0 },
      },
    },
  };