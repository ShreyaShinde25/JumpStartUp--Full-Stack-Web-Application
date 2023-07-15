import { DatePipe } from '@angular/common';
import { DateDisplayPipe } from './date-display.pipe';
import { Timestamp } from '@angular/fire/firestore';

describe('DateDisplayPipe', () => {
  let pipe: DateDisplayPipe;
  let datePipe: DatePipe;

  beforeEach(() => {
    datePipe = new DatePipe('en-US');
    pipe = new DateDisplayPipe(datePipe);
  });

  it('should return empty string if date is undefined', () => {
    const result = pipe.transform(undefined);
    expect(result).toBe('');
  });

  it('should transform Timestamp to short date string', () => {
    const timestamp = { toMillis: () => Date.now() } as Timestamp;
    const result = pipe.transform(timestamp);
    const expectedResult = datePipe.transform(timestamp.toMillis(), 'short');
    if (expectedResult) {
      expect(result).toBe(expectedResult);
    } else {
      fail('Expected result is null or undefined.');
    }
  });
});
