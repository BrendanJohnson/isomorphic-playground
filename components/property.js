import { convertTime } from "../app/utils"

export default ({ title, points, time, url }) => {
	return (
		<div className="content">
			<a className="title" target="_blank" href={url}>
				{title}
			</a>
			<div className="bottom-content">
              <span>{points} {(points > 1) ? ' points' : ' point'} </span>
              <span> | {convertTime(time)} </span>
            </div>
			<style jsx>{`
			     .content {
			          background: #fff;
					  margin-bottom: 0;
					  min-height: 90px;
					  cursor: default;
					  padding-left: 10px;
					  padding-right: 10px;
					  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
				      box-shadow: 0 -1px 0 #e5e5e5,0 0 2px rgba(0,0,0,.12),0 2px 4px rgba(0,0,0,.24);
			      }
			      .content:last-child {
				    margin-bottom: 0;

				  }
				  .content:hover {
				    background: #F9F8F8;
				  }
				  .bottom-content {
				  	  width: 410px;
					  height: 30px;
					  color: rgb(77, 87, 99);
					  font-size: 13px;
				  }
				  .title {
				  	    margin-right: 10px;
    					text-decoration: none;
				  }
			  `}</style>
		</div>
	)
}