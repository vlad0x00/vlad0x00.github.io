#!/usr/bin/env python3

import csv
import os
import pandas as pd

def main():
    scores = {}

    # Iterate all CSV files in the current directory
    for file in os.listdir("."):
        if file.endswith(".csv"):
            # Open the file
            with open(file, "r") as f:
                # Skip the first 3 lines
                for _ in range(3):
                    next(f)

                # Read the CSV file
                reader = csv.DictReader(f)

                # Iterate the remaining rows
                for row in reader:
                    name = row["Poet"]
                    email = row["Email"]
                    place = row["Place"]

                    # If the place is #1, #2, or #3
                    if place in ["#1", "#2", "#3"]:
                        # If the poet is not in the dictionary
                        if email not in scores:
                            # Add them
                            scores[email] = {
                                "name": name,
                                "#1": 0,
                                "#2": 0,
                                "#3": 0,
                            }

                        # Increment the place
                        scores[email][place] += 1

    # Create a DataFrame from the dictionary
    df = pd.DataFrame.from_dict(scores, orient="index")

    # Save the DataFrame to a CSV file
    df.to_csv("scores.csv")

if __name__ == "__main__":
    main()
