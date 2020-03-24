import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFinderComponent } from './group-finder.component';

describe('GroupFinderComponent', () => {
  let component: GroupFinderComponent;
  let fixture: ComponentFixture<GroupFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
