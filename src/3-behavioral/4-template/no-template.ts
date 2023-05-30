// ! ❌ Bad example of not using a template

export class EnrollmentService {
  public enrol(activity: string): string {
    if (activity === "") {
      throw new Error("Activity name is required");
    }
    let businessResult = "";
    try {
      console.log("#️⃣ transaction started");
      const paymentResult = "🤑 Paying Activity " + activity;
      businessResult = "✍🏼 Booking Activity " + paymentResult;
      console.log("#️⃣ action done");
      const notification = "📧 Activity booked " + businessResult;
      console.log("#️⃣ notification sent");
    } catch (error) {
      console.error("#️⃣ 😵‍💫 error: " + error);
    }
    return businessResult;
  }

  // ! 😱 repeated steps
  public unenroll(activity: string): string {
    if (activity === "") {
      throw new Error("Activity name is required");
    }
    let businessResult = "";
    try {
      console.log("#️⃣ transaction started");
      const refundResult = "💸  Refunding Activity " + activity;
      businessResult = "😭  Unenrolled Activity " + refundResult;
      console.log("#️⃣ action done");
      const notification = "📧 Activity booked " + businessResult;
      console.log("#️⃣ notification sent");
    } catch (error) {
      console.error("#️⃣ 😵‍💫 error: " + error);
    }
    return businessResult;
  }
  // ToDo: confirm activity
  // ToDo: cancel activity
}

export class Application {
  private service = new EnrollmentService();
  public run(): void {
    this.service.enrol("Snorkeling on the Red Sea");
    this.service.unenroll("Snorkeling on the Red Sea");
  }
}

const application = new Application();
application.run();
