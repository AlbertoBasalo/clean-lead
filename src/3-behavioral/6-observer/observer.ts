// * ✅ Observer solution

// * 😏 the observer contract is a function used as a listener or callback
type Observer = (data: object) => void;

// * 😏 the observable contract is a set of methods to subscribe, unsubscribe and publish events
interface Observable {
  subscribe(eventName: string, observer: Observer): void;
  unsubscribe(eventName: string, observer: Observer): void;
  publish(eventName: string, eventArgs: object): void;
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

// * 😏 an event bus could be generic and reusable
export class EventBus implements Observable {
  private subscriptions: Map<string, Observer[]> = new Map();

  subscribe(eventName: string, observer: Observer): void {
    let eventObservers = this.subscriptions.get(eventName);
    if (!eventObservers) {
      eventObservers = [];
      this.subscriptions.set(eventName, eventObservers);
    }
    eventObservers.push(observer);
  }

  unsubscribe(eventName: string, observer: Observer): void {
    const eventObservers = this.subscriptions.get(eventName);
    if (!eventObservers) return;
    const index = eventObservers.indexOf(observer);
    eventObservers.splice(index, 1);
  }

  publish(eventName: string, eventArgs: object): void {
    const eventObservers = this.subscriptions.get(eventName);
    if (!eventObservers) return;
    eventObservers.forEach((observer) => observer(eventArgs));
  }
}

// * 😏 now you can extend or wrap the event bus
export class Agency extends EventBus {
  private bookings: object[] = [];

  addBooking(booking: object) {
    this.bookings.push(booking);
    this.publish("booking-created", booking);
  }
  addActivity(activity: object) {
    this.publish("activity-created", activity);
  }
}

export class App {
  main() {
    const agency = new Agency();
    // * 😏 agency is now decoupled from Logger, Payments or whatever
    agency.subscribe("booking-created", this.onBookingCreatedLog);
    agency.subscribe("booking-created", this.onBookingCreatedPay);
    agency.subscribe("activity-created", this.onActivityCreatedLog);
    agency.addBooking({ trip: "Paris", price: 100 });
  }
  private onBookingCreatedLog(data: object): void {
    const logger = new Logger();
    logger.log("info", `Booking created: ${data}`);
  }
  private onActivityCreatedLog(data: object): void {
    const logger = new Logger();
    logger.log("warning", `Activity created: ${data}`);
  }
  private onBookingCreatedPay(data: object): void {
    const payments = new Payments();
    payments.pay((data as any).amount);
  }
}
