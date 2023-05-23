// ! ❌ Bad example not using a command

// The receiver
export class EnrolmentService {
  enroll(activity: string, participant: string): void {
    console.log(`Enrolling ${participant} in ${activity}`);
  }

  unenroll(activity: string, participant: string): void {
    console.log(`Un-enrolling ${participant} in ${activity}`);
  }
}

// The invoker
export class EnrolmentController {
  private service: EnrolmentService = new EnrolmentService();

  // ! 😱 tight coupling invoker and receiver
  enroll(activity: string, participant: string): void {
    this.service.enroll(activity, participant);
  }
  unEnroll(activity: string, participant: string): void {
    this.service.unenroll(activity, participant);
  }
}
