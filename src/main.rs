use web_view::*;
fn main() {
    println!("Starting");
    builder()
        .content(web_view::Content::Html(include_str!("../index.html")))
        .debug(true)
        .resizable(true)
        .size(1010, 935)
        .title("D&D Character Manager")
        .user_data(())
        .invoke_handler(|webview: &mut web_view::WebView<()>, msg: &str| {
            let json: serde_json::Map<String, serde_json::Value> = serde_json::from_str(msg).expect("failed to deserialize json");
            if let Some(serde_json::Value::String(ref value)) = json.get("event") {
                match value.as_str() {
                    "init" => {
                        webview.inject_css(include_str!("../main.css"))?;
                        webview.eval(include_str!("../dist/main.js"))?;
                    },
                    "save-characters" => {
                        if let Some(ref value) = json.get("data") {
                            save_state(value)
                        }
                    },
                    "get-characters" => {
                        let state = get_state();
                        webview.eval(&format!(r#"dispatchEvent(new CustomEvent('rcp-update', {{detail: {}}}));"#, state))?;
                    }
                    _ => ()
                }
            }
            
            Ok(())
        })
        .run()
        .unwrap();
}

fn save_state(state: &serde_json::Value) {
    let s = serde_json::to_string(state).unwrap();
    ::std::fs::write(".dnd.json", &s[..s.len()]).unwrap();
}

fn get_state() -> String {
    ::std::fs::read_to_string(".dnd.json").unwrap()
}