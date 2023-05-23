// * ✅ Memento solution
export class Activity {
  private title: string;
  private attendees: string[] = [];
  private places: number;
  private reservedPlaces: number = 0;
  private status: "pending" | "confirmed" = "pending";
  private minimumAttendees: number = 3;
  public readonly isConfirmed: boolean = this.status === "confirmed";

  private memento: ActivityMemento | null = null;

  constructor(title: string, places: number) {
    this.title = title;
    this.places = places;
  }

  get availablePlaces(): number {
    return this.places - this.attendees.length;
  }
  enroll(name: string): void {
    this.saveState();
    if (this.attendees.length >= this.places) {
      throw new Error("No more places available on " + this.title);
    }
    this.attendees.push(name);
  }
  cancel(): void {
    this.restoreState();
  }
  saveState() {
    // * similar to a snapshot or prototype
    const state: ActivityState = {
      title: this.title,
      attendees: [...this.attendees],
      places: this.places,
      reservedPlaces: this.attendees.length, // * 😏 could be the actual value
    };
    this.memento = new ActivityMemento(state);
  }
  restoreState(): void {
    if (!this.memento) {
      return;
    }
    const state = this.memento.restoreState();
    this.title = state.title;
    this.attendees = state.attendees;
    this.places = state.places;
    this.reservedPlaces = state.reservedPlaces;
    // * 😏 could be the actual value or logic to calculate it
    this.status = state.reservedPlaces >= 3 ? "confirmed" : "pending";
  }
}

type ActivityState = {
  title: string;
  attendees: string[];
  places: number;
  reservedPlaces: number;
};

class ActivityMemento {
  private title: string;
  private attendees: string[];
  private places: number;
  private reservedPlaces: number = 0;
  private status: "pending" | "confirmed" = "pending";

  // * 😏 allows undo operations deferred in time

  constructor(state: ActivityState) {
    this.title = state.title;
    this.attendees = state.attendees;
    this.places = state.places;
    this.reservedPlaces = state.reservedPlaces;
    // * 😏 Could also be a JSON.stringify() of the object or saving to a file
  }

  restoreState(): ActivityState {
    // 😏 Could also be a JSON.parse() of the string or reading from a file
    return {
      title: this.title,
      attendees: this.attendees,
      places: this.places,
      reservedPlaces: this.reservedPlaces,
    };
  }
}
