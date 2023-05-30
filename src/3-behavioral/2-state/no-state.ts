// ! ❌ Bad example of not using a state

type ActivityEnrollmentStateType = "Paying" | "Booking" | "Cancelling";

export class ActivityEnrollmentProcessor {
  state: ActivityEnrollmentStateType = "Booking";

  process(enrollment: unknown): unknown {
    // ! 😱 no control over the order of the calls
    // ! 😱 the switch is not open for extension
    switch (this.state) {
      case "Paying":
        return "payment done : " + enrollment;
      case "Booking":
        return "booking done : " + enrollment;
      case "Cancelling":
        return "cancelling done : " + enrollment;
    }
  }
}

export class Application {
  main() {
    let enrollment = { activity: "surfing", places: 2, amount: 100 };
    let activityEnrollment = new ActivityEnrollmentProcessor();
    activityEnrollment.state = "Booking";
    activityEnrollment.process(enrollment.places);
    activityEnrollment.state = "Paying";
    activityEnrollment.process(enrollment.amount);
    activityEnrollment.state = "Cancelling";
    activityEnrollment.process(enrollment.activity);
  }
}
