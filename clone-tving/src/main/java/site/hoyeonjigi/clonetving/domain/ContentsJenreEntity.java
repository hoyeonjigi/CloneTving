package site.hoyeonjigi.clonetving.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "content_jenre")
@Data
@AllArgsConstructor
@IdClass(ContentJenreEntityPK.class)
public class ContentsJenreEntity {

    @Id
    @ManyToOne
    @JoinColumn(name = "content_id")
    private ContentsEntity content;

    @Id
    @ManyToOne
    @JoinColumn(name = "jenre_id")
    private JenreEntity jenre;

}
