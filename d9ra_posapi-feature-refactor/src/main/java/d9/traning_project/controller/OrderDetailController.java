package d9.traning_project.controller;

import d9.traning_project.service.impl.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/orderDetail")
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(orderDetailService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{idOrder}")
    public ResponseEntity<?> getOrderDetail(@PathVariable Long idOrder) {
        return new ResponseEntity<>(orderDetailService.getOrderDetail(idOrder), HttpStatus.OK);
    }
}
