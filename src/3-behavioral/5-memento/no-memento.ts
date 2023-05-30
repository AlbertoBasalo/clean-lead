// ! ❌ Bad example not using a memento

// ! 😱 want to save state of an object to undo operations deferred in time
export class Activity {
  // ! 😱 private data no serializable
  private title: string;
  private attendeesRepository: string[] = [];
  private places: number = 0;
  private reservedPlaces: number = 0;
  private minimumAttendees: number = 3;
  // ! 😱 redundant or calculated data
  private status: "pending" | "confirmed" | "cancelled" = "pending";
  public isConfirmed: boolean = false;
  public readonly availablePlaces: number = this.places - this.reservedPlaces;

  constructor(title: string, places: number) {
    this.title = title;
    this.places = places;
  }

  enroll(name: string): void {
    if (this.status === "cancelled") throw new Error("Cannot enroll a cancelled activity");
    if (this.reservedPlaces >= this.places) {
      throw new Error("No more places available on " + this.title);
    }
    this.attendeesRepository.push(name);
    this.reservedPlaces++;
    if (this.reservedPlaces >= this.minimumAttendees) {
      this.status = "confirmed";
      this.isConfirmed = true;
    }
  }
  unenroll(): void {
    // ! 😱 unenrolled logic is needed here
    if (this.attendeesRepository.length === 0) {
      return;
    }
    this.attendeesRepository.pop();
    this.reservedPlaces--;
    if (this.reservedPlaces < this.minimumAttendees) {
      this.status = "pending";
      this.isConfirmed = false;
    }
  }
  cancel(): void {
    this.status = "cancelled";
    this.isConfirmed = false;
  }
}
