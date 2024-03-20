import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Tariff } from '../tariff.model';
import { MockDataService } from '../mock-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-list.component.html',
  styleUrl: './result-list.component.scss',
})
export class ResultListComponent {
  private tariffs$!: Observable<Tariff[]>;
  private allTariffs: Tariff[] = [];
  public filteredTariffs: Tariff[] = [];
  public loading = signal(false);

  @ViewChild('downloadSelect') downloadSelect!: ElementRef;
  @ViewChild('uploadSelect') uploadSelect!: ElementRef;
  @ViewChild('priceSelect') priceSelect!: ElementRef;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.tariffs$ = this.mockDataService.getMockData();
    this.tariffs$.subscribe((tariffs: Tariff[]) => {
      this.allTariffs = tariffs;
      this.filteredTariffs = tariffs;
    });
  }

  // Filter by download speed
  filterByDownloadSpeed(event: Event): void {
    const speed: string = (event.target as HTMLTextAreaElement).value;
    this.loading.set(true);
    setTimeout(() => {
      if (speed) {
        this.filteredTariffs = this.allTariffs.filter(
          (tariff) => tariff.downloadSpeed === speed
        );
      } else {
        this.filteredTariffs = this.allTariffs;
      }
      this.uploadSelect.nativeElement.value = '';
      this.priceSelect.nativeElement.value = '';
      this.loading.set(false);
    }, 300);
  }

  // Filter by upload speed
  filterByUploadSpeed(event: Event): void {
    const speed: string = (event.target as HTMLTextAreaElement).value;
    this.loading.set(true);
    setTimeout(() => {
      if (speed) {
        this.filteredTariffs = this.allTariffs.filter(
          (tariff) => tariff.uploadSpeed === speed
        );
      } else {
        this.filteredTariffs = this.allTariffs;
      }
      this.downloadSelect.nativeElement.value = '';
      this.priceSelect.nativeElement.value = '';
      this.loading.set(false);
    }, 300);
  }

  // Filter by price
  filterByPrice(event: Event): void {
    const price: number = +(event.target as HTMLTextAreaElement).value;
    this.loading.set(true);
    setTimeout(() => {
      if (price) {
        this.filteredTariffs = this.allTariffs.filter(
          (tariff) => tariff.price === price
        );
      } else {
        this.filteredTariffs = this.allTariffs;
      }
      this.downloadSelect.nativeElement.value = '';
      this.uploadSelect.nativeElement.value = '';
      this.loading.set(false);
    }, 300);
  }
}
