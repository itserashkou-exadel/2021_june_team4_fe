import { Injectable } from "@angular/core";

export type FuzzyScore = number;

export interface FuzzySegment {
  value: string;
  isMatch: boolean;
}

@Injectable({
  providedIn: "root"
})
export class FuzzyMatcher {

  // I parse the value against the given input, dividing it up into a collection of
  // segments that either match or do not match sequences within the input.
  public parseValue( value: string, input: string ) : FuzzySegment[] {

    let valueLength = value.length;
    let inputLength = input.length;
    let valueIndex = 0;
    let inputIndex = 0;

    let segments: FuzzySegment[] = [];
    let segment: FuzzySegment;

    while ( valueIndex < valueLength ) {

      let valueChar = value.charAt( valueIndex++ ).toLowerCase();
      let inputChar = input.charAt( inputIndex ).toLowerCase();

      // If this character matches the input, add to a matching segment.
      if ( valueChar === inputChar ) {

        inputIndex++;

        // @ts-ignore
        if ( segment && segment.isMatch ) {

          segment.value += valueChar;

        } else {

          segment = {
            value: valueChar,
            isMatch: true
          };
          segments.push( segment );

        }

        // If we've run out of input characters to match, we can short-circuit
        // the segmentation - we know that the rest of the value will contain
        // non-matching characters - we can add them to a final segment.
        if ( ( inputIndex === inputLength ) && ( valueIndex < valueLength ) ) {

          segments.push({
            value: value.slice( valueIndex ),
            isMatch: false
          });

          // Force the while-loop to end.
          break;

        }

        // If this character does NOT match the input, add to a non-matching segment.
      } else {

        // @ts-ignore
        if ( segment && ! segment.isMatch ) {

          segment.value += valueChar;

        } else {

          segment = {
            value: valueChar,
            isMatch: false
          };
          segments.push( segment );

        }

      }

    }

    return( segments );

  }


  // I compare the input to the given value and return a score for the fuzzy match.
  public scoreValue( value: string, input: string ) : FuzzyScore {

    // For the scoring process, we don't need to maintain the case of the arguments.
    // As such, we can normalize them now so that we don't have to do it inside of
    // each loop iteration.
    let normalizedValue = value.toLowerCase();
    let normalizedInput = input.toLowerCase();

    let valueLength = normalizedValue.length;
    let inputLength = normalizedInput.length;
    let valueIndex = 0;
    let inputIndex = 0;

    // When several letters are matched in a row, we're going to give them extra
    // weight in the scoring since this more likely to provide a meaningful match.
    let previousIndexMatched = false;
    let score = 0;

    while ( valueIndex < valueLength ) {

      let valueChar = normalizedValue.charAt( valueIndex++ ); // Get and increment.
      let inputChar = normalizedInput.charAt( inputIndex );

      // If the current character matches the next part of the sequential input,
      // we are going to increase the score of the match.
      if ( valueChar === inputChar ) {

        inputIndex++;

        // If the previous character was also a match, let's bump the score by
        // slightly more.
        score += ( previousIndexMatched )
          ? 3
          : 2
        ;

        previousIndexMatched = true;

        // If we've run out of input characters to match, then we can short-
        // circuit the scoring based on the number of remaining characters in the
        // value (each remaining character will be detracted from the score).
        if ( inputIndex === inputLength ) {

          return( score -= ( valueLength - valueIndex ) );

        }

        // If the current character does NOT Match the next part of the sequential
        // input, we are going to decrease the score of the match.
      } else {

        score -= 1;
        previousIndexMatched = false;

      }

    }

    return( score );

  }

}
