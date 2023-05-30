// * ✅ Memento solution
export class Activity {
  private title: string;
  private attendeesRepository: string[] = [];
  private places: number = 0;
  private reservedPlaces: number = 0;
  private minimumAttendees: number = 3;
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

  takeSnapshot(): ActivityMemento {
    // * 😏 similar to a prototype
    // * 😏 get private values
    const memento: ActivityMemento = {
      title: this.title,
      attendees: [...this.attendeesRepository],
      places: this.places,
      status: this.status,
    };
    return memento;
  }
  restore(memento: ActivityMemento): void {
    // * 😏 similar to builder
    // * 😏 set private values
    this.title = memento.title;
    this.attendeesRepository = memento.attendees;
    this.places = memento.places;
    this.status = memento.status;
    // * 😏 set calculated values
    this.reservedPlaces = memento.attendees.length;
    this.isConfirmed = this.status != "cancelled" && this.reservedPlaces >= 3;
  }
}

// * 😏 public properties for required memento data
type ActivityMemento = {
  title: string;
  attendees: string[];
  places: number;
  status: "pending" | "confirmed" | "cancelled";
};
