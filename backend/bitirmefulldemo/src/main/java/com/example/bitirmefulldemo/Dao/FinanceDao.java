package com.example.bitirmefulldemo.Dao;
import java.util.List;
import com.example.bitirmefulldemo.POJO.Finance;
import com.example.bitirmefulldemo.wrapper.FinanceWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import javax.transaction.Transactional;


public interface FinanceDao extends JpaRepository<Finance,Integer> {
    List<FinanceWrapper> getFinance(@Param("userId") int id);
    List<FinanceWrapper> getFinanceConstraint(@Param("userId") int id,@Param("taskId") int taskId);
    FinanceWrapper getFinanceById(@Param("id") int id);
    String getGelir(@Param("taskId") int taskId);

    String getGider(@Param("taskId") int taskId);
    @Transactional
    @Modifying
    Integer deleteFinance(@Param("id") int id);

    @Transactional
    @Modifying
    Integer updateFinance(@Param("id") int id,@Param("aciklama") String aciklama,@Param("odemeAlan") String odemeAlan,
                                 @Param("odeyenTelefon") String odeyenTelefon,@Param("tutar") int tutar,
                                 @Param("odeyen") String odeyen,@Param("tip") String tip);




}
