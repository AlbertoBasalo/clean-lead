// * ✅ Command solution

export interface BusinessProcess {
  execute(payload: string): string;
}

export abstract class BusinessTemplate implements BusinessProcess {
  public execute(payload: string): string {
    this.validation(payload);
    try {
      // * 😏 hard coded instrumentation steps
      console.log("#️⃣ transaction started");
      // * 😏 mandatory steps
      const paymentResult = this.paymentsTransaction(payload);
      const businessResult = this.doBusinessAction(paymentResult);
      console.log("#️⃣ action done");
      // * 😏 optional step with default implementation if not overridden
      this.sendNotification(businessResult);
      console.log("#️⃣ notification sent");
      return businessResult;
    } catch (error) {
      // * 😏 hard coded common step
      console.error("#️⃣ 😵‍💫 error: " + error);
      return "";
    }
  }
  // * 😏 mandatory steps to be implemented by subclasses
  protected abstract paymentsTransaction(payload: string): string;
  protected abstract doBusinessAction(payload: string): string;
  // * 😏 optional step with default implementation if not overridden
  protected validation(payload: string): void {
    if (payload === "") {
      throw new Error("Activity name is required");
    }
  }
  protected sendNotification(payload = ""): void {
    console.warn("✅ Done " + payload);
  }
}

// * 😏 custom implementation steps while enrollment or cancellation

export class EnrollActivity extends BusinessTemplate {
  protected paymentsTransaction(destination: string): string {
    return "🤑  Paying Activity to " + destination;
  }
  protected doBusinessAction(payment: string): string {
    return "✍🏼 Booking Activity " + payment;
  }
  // * 😏 optional step overridden with custom implementation
  protected override sendNotification(booking: string): void {
    console.warn("📧 Activity booked " + booking);
  }
}

export class CancelActivity extends BusinessTemplate {
  protected paymentsTransaction(destination: string): string {
    return "💸  Refunding Activity " + destination;
  }
  protected override doBusinessAction(refund: string): string {
    return "😭  Cancelling Activity " + refund;
  }
  // * 😏 optional step (sendNotification) inherited with default implementation
}

// * 😏 creating a new business process is easy while ensures the same steps

export class Client {
  // * 😏 you can depend on abstraction not implementation
  private enrolling: BusinessProcess = new EnrollActivity();
  private cancel: BusinessTemplate = new CancelActivity();
  public run(): void {
    this.enrolling.execute("Snorkeling on the Red Sea");
    this.cancel.execute("Snorkeling on the Red Sea");
  }
}

const client = new Client();
client.run();
