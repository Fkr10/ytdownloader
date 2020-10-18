const express = require('express');
const ytdl = require('ytdl-core');
const cors= require('cors');
const PORT = 4000;
const app =express();
app.use(cors());
app.listen(PORT, ()=>{
    console.log(`server start at  ${PORT}`);

});
app.get('/dlmp3',async(req,res,next)=>{
    try{
        let url=req.query.url;
        if(!ytdl.validateURL(url)){
            return res.sendStatus(400);
        }
        let title='audio';
        await ytdl.getBasicInfo(url,{
            format:'mp4'},(err,info)=>{
                title=info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
            });
            res.header('Content-Disposition',`attechment; filename="${title}.mp3"`);
            ytdl(url,{
                format:'mp3',
                filter:'audioonly',
            }).pipe(res);

    }catch(err){
        console.log(err);
    }
});
app.get('/dlmp4', async (req, res, next) => {
	try {
		let url = req.query.url;
		if(!ytdl.validateURL(url)) {
			return res.sendStatus(400);
		}
		let title = 'video';

		await ytdl.getBasicInfo(url, {
			format: 'mp4'
		}, (err, info) => {
			title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
		});

		res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
		ytdl(url, {
			format: 'mp4',
		}).pipe(res);

	} catch (err) {
		console.error(err);
	}
});