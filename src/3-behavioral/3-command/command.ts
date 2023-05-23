// * ✅ Command solution

// * 😏 Command interface
export interface Command {
  execute(activity: string, participant: string): void;
  // ToDo: create a type to have only one argument
  // ToDo: add a unDo reDo methods
}

// * 😏 Concrete command class 1
export class EnrollCommand implements Command {
  constructor(private receiver: EnrolmentServiceReceiver) {}
  execute(activity: string, participant: string): void {
    this.receiver.enroll(activity, participant);
    // * 😏 Alternatively, we could implement the business logic here
  }
}

// * 😏 Concrete command class 2
export class UnenrollCommand implements Command {
  constructor(private receiver: EnrolmentServiceReceiver) {}
  execute(activity: string, participant: string): void {
    this.receiver.unenroll(activity, participant);
  }
}

// * 😏 Custom Invoker class
export class EnrolmentControllerInvoker {
  private receiver: EnrolmentServiceReceiver = new EnrolmentServiceReceiver();

  dispatchEnrollment(activity: string, participant: string): void {
    const enrollCommand: Command = new EnrollCommand(this.receiver);
    enrollCommand.execute(activity, participant);
  }
  dispatchUnEnrollment(activity: string, participant: string): void {
    const unenrollCommand: Command = new UnenrollCommand(this.receiver);
    unenrollCommand.execute(activity, participant);
  }
}

// * 😏 Receiver class (The business logic)
export class EnrolmentServiceReceiver {
  enroll(activity: string, participant: string): void {
    console.log(`Enrolling ${participant} in ${activity}`);
  }

  unenroll(activity: string, participant: string): void {
    console.log(`Un-enrolling ${participant} in ${activity}`);
  }
}

// Usage
const enrolmentInvoker: EnrolmentControllerInvoker = new EnrolmentControllerInvoker();
enrolmentInvoker.dispatchEnrollment("Swimming", "John");
enrolmentInvoker.dispatchEnrollment("Swimming", "Jane");
enrolmentInvoker.dispatchUnEnrollment("Swimming", "Jane");

// * 😏 Generic Invoker class
export class Invoker {
  // ToDo: add a history of commands
  // ToDo: add serialization/deserialization for later or remote use
  constructor(private command: Command) {}
  execute(activity: string, participant: string): void {
    this.command.execute(activity, participant);
  }
}
