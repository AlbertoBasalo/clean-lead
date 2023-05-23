// * ✅ State solution
export interface ActivityEnrollmentState {
  data: unknown;
  onChange(): void;
  execute(): unknown;
}

export class PayingState implements ActivityEnrollmentState {
  data: number;
  constructor(amount: number) {
    this.data = amount;
  }
  onChange() {
    // * 😏 do something
  }
  execute() {
    return "payment done : " + this.data;
  }
}

export class BookingState implements ActivityEnrollmentState {
  data: number;
  constructor(places: number) {
    this.data = places;
  }
  onChange() {
    // * 😏 do something
  }
  execute() {
    return "booking done : " + this.data;
  }
}

export class CancellingState implements ActivityEnrollmentState {
  data: string;
  constructor(enrollmentId: string) {
    this.data = enrollmentId;
  }
  onChange() {
    // * 😏 do something
  }
  execute() {
    return "cancelling done : " + this.data;
  }
}

export class ActivityEnrollment {
  private state: ActivityEnrollmentState = new PayingState(0);

  changeState(state: ActivityEnrollmentState): void {
    // ToDo: validate state transition
    this.state = state;
    this.state.onChange();
    // ToDo: add to history
  }
  execute(): unknown {
    return this.state.execute();
  }
}
