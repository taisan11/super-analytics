export function acceptLanguage(header:string|undefined) {
    if (!header||header === undefined) return [];                        // ヘッダーがない場合は空
    let bucket ={};                              // バケツソートの器
    let lang;
    header = header.replace(/^\s+/g,'').replace(/\s+$/,'');
                            // 前後の空白を捨てる
    for (lang of header.split(/\s*,\s*/)) {   
                  // , で分割
        let [ key, value ] = lang.split(/\s*;\s*q\s*=\s*/);
                                                    // ;q= でキー・バリューに分割
        value = +(value || 1);                      // バリューのデフォルト値は 1
        if (isNaN(value)) continue; 
                        // 数値でない場合はスキップ
        if (! bucket[`${value}`]) bucket[`${value}`] = [];
        
        bucket[`${value}`].push(key);               // バケツに入れる
    }
    
    let rv = [];                                    // バケツソートして優先度を得る
    for (let q of Object.keys(bucket).sort((x,y)=>(+y)-(+x))) {
        
        rv = rv.concat(bucket[q]);
    }
    return rv;
}
