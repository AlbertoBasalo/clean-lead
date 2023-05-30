// ! ❌ Bad example of not using an observable

// ! 😱 Agency depends on Logger and Payments
class Agency {
  private bookings: object[] = [];
  constructor(private logger: Logger, private payments: Payments) {}

  addBooking(booking: object) {
    this.bookings.push(booking);
    // ! 😱 what if we want to send confirmation messages or anything else?
    this.logger.log("info", `Booking created: ${JSON.stringify(booking)}`);
    this.payments.pay(100);
  }
}

// ! 😱 App is aware of Agency and its dependencies
export class App {
  main() {
    const logger = new Logger();
    const payments = new Payments();
    const agency = new Agency(logger, payments);
    agency.addBooking({ trip: "Paris", price: 100 });
  }
}

export class Logger {
  log(category: string, data: string): void {
    if (category === "err") console.error(data);
    else console.log(data);
  }
}

export class Payments {
  pay(amount: number): void {
    console.log(`Payment of ${amount} processed`);
  }
}
