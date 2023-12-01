fn main() {
    let input = std::fs::read_to_string("input.txt").unwrap();
    let mut sum = 0;
    for line in input.split('\n') {
        // println!("Line: {}", line);
        let mut to_sum = Vec::new();
        let mut num_in_string = Vec::new();
        
        for c in line.chars() {
            if c.is_digit(10) {
                num_in_string.push(c.to_digit(10).unwrap());
            }
        }

        if num_in_string.len() == 0 {
            continue;
        }

        to_sum.push(num_in_string[0] * 10 + num_in_string[num_in_string.len() - 1]);

        // println!("Ranges: {:?}", to_sum);
        // add up all numbers in toSum
        for range in to_sum {
            sum += range;
        }
    }

    println!("Total calibration: {}", sum);
}