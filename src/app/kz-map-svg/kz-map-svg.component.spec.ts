import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KzMapSvgComponent } from './kz-map-svg.component';

describe('KzMapSvgComponent', () => {
  let component: KzMapSvgComponent;
  let fixture: ComponentFixture<KzMapSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KzMapSvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KzMapSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
