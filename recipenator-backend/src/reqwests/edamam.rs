use reqwest;

pub async fn get_recipes(data: &str) -> Result<serde_json::Value, reqwest::Error> 
{
    let app_id = "YOUR_APP_ID";
    let app_key = "YOUR_APP_KEY";
    let url = format!(
        "https://api.edamam.com/search?&app_id={}&app_key={}&q={}",
         app_id, app_key, data
    );
    if response.status().is_success() {
        let json: serde_json::Value = response.json().await?;
        Ok(json)
    } else {
        Err(reqwest::Error::new(reqwest::StatusCode::INTERNAL_SERVER_ERROR, "API request failed"))
    }
}

pub fn process_edamam_data(data: &str) -> Result<(), Box<dyn std::error::Error>> {

    println!("Processing Edamam data: {}", data);
    Ok(())
}
