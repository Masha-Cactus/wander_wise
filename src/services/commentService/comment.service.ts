import { authClient } from "@/src/api";
import { ApiEndpoints } from "@/src/lib/constants";
import { 
  IComment,
  ICreateComment, 
  IReportComment, 
  IUpdateComment 
} from "@/src/services";

class CommentService {
  private BASE_URL = ApiEndpoints.COMMENTS;
    
  createComment(data: ICreateComment) {
    return authClient.post<never, IComment>(this.BASE_URL, data);
  };
    
  updateComment({id, ...data}: IUpdateComment) {
    return authClient.put<never, IComment>(
      `${this.BASE_URL}/${id}`,
      data,
    );
  };
    
  reportComment({id, ...data}: IReportComment) {
    return authClient.put(`${this.BASE_URL}/report/${id}`, data);
  };   

  deleteComment (id: number) {
    return authClient.delete(`${this.BASE_URL}/${id}`);
  };
}

export const commentService = new CommentService();